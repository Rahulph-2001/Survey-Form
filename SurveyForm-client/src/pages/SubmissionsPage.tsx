import { useEffect, useState } from 'react';
import { surveyService, type PaginatedSurveysResponse } from '../services/surveyService';
import { Toast } from '../components/common/Toast';
import { useDebounce } from '../hooks/useDebounce';
import { type Survey } from '../types/survey.types';
import { EditSurveyModal } from '../components/admin/EditSurveyModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmNodal';

export const SubmissionsPage = () => {
    const [surveyData, setSurveyData] = useState<PaginatedSurveysResponse>({
        data: [],
        totalCount: 0,
        page: 1,
        totalPages: 1
    });

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Modal states
    const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
    const [deletingSurvey, setDeletingSurvey] = useState<Survey | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchSurveys = async (pageToFetch = currentPage) => {
        setIsLoading(true);
        try {
            const response = await surveyService.getAllSurveys(pageToFetch, 10, debouncedSearchTerm);
            setSurveyData(response.data);
        } catch (error: any) {
            setToast({
                message: error.response?.data?.message || 'Failed to load submissions',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        fetchSurveys();
    }, [currentPage, debouncedSearchTerm]);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < surveyData.totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleEditSubmission = async (id: string, data: any) => {
        setIsActionLoading(true);
        try {
            await surveyService.updateSurvey(id, data);
            setToast({ message: 'Submission updated successfully', type: 'success' });
            setEditingSurvey(null);
            fetchSurveys();
        } catch (error: any) {
            setToast({ message: error.response?.data?.message || 'Failed to update submission', type: 'error' });
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteSubmission = async () => {
        if (!deletingSurvey) return;
        setIsActionLoading(true);
        try {
            await surveyService.deleteSurvey(deletingSurvey.id);
            setToast({ message: 'Submission deleted successfully', type: 'success' });
            setDeletingSurvey(null);

            // If deleting the last item on a page, drop back a page
            if (surveyData.data.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchSurveys();
            }
        } catch (error: any) {
            setToast({ message: error.response?.data?.message || 'Failed to delete submission', type: 'error' });
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background p-4 sm:p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Modals */}
            {editingSurvey && (
                <EditSurveyModal
                    survey={editingSurvey}
                    isOpen={true}
                    onClose={() => setEditingSurvey(null)}
                    onSubmit={handleEditSubmission}
                    isSubmitting={isActionLoading}
                />
            )}

            {deletingSurvey && (
                <DeleteConfirmModal
                    isOpen={true}
                    onClose={() => setDeletingSurvey(null)}
                    onConfirm={handleDeleteSubmission}
                    isDeleting={isActionLoading}
                    surveyName={deletingSurvey.name}
                />
            )}

            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Survey Submissions</h1>
                        <p className="text-sm sm:text-base text-gray-400">View and manage all customer feedback responses.</p>
                    </div>

                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-sm sm:text-base text-gray-400">Loading submissions...</p>
                    </div>
                ) : surveyData.data.length === 0 ? (
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 sm:p-12 text-center">
                        <h3 className="text-lg sm:text-xl text-white font-medium mb-2">No Submissions Found</h3>
                        <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or wait for new responses.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-xl hidden sm:block">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-800/80 text-xs uppercase text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Date</th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Name</th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Email</th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Phone & Location</th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium">Message</th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50 bg-gray-900/30">
                                    {surveyData.data.map((survey: any) => (
                                        <tr key={survey.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                                                {new Date(survey.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                                                <div className="font-medium text-white text-xs sm:text-sm">{survey.name}</div>
                                                <div className="text-[10px] sm:text-xs text-primary">{survey.gender}</div>
                                            </td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">{survey.email}</td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                                                <div className="text-xs sm:text-sm">{survey.phone}</div>
                                                <div className="text-[10px] sm:text-xs">{survey.nationality}</div>
                                            </td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 max-w-30 lg:max-w-50 truncate text-xs sm:text-sm" title={survey.message}>
                                                {survey.message}
                                            </td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setEditingSurvey(survey)}
                                                    className="p-1.5 text-gray-400 hover:text-primary transition-colors hover:bg-gray-800 rounded-lg mr-2"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => setDeletingSurvey(survey)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-800 rounded-lg"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="sm:hidden space-y-4">
                            {surveyData.data.map((survey: any) => (
                                <div key={survey.id} className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-white">{survey.name}</h4>
                                            <p className="text-xs text-primary">{survey.gender}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md">
                                            {new Date(survey.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 w-12 shrink-0">Email:</span>
                                            <span className="truncate">{survey.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 w-12 shrink-0">Phone:</span>
                                            <span className="truncate">{survey.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 w-12 shrink-0">Origin:</span>
                                            <span className="truncate">{survey.nationality}</span>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-gray-800/50">
                                        <p className="text-sm text-gray-400 line-clamp-3 mb-3">{survey.message}</p>
                                        <div className="flex gap-2 w-full mt-2">
                                            <button
                                                onClick={() => setEditingSurvey(survey)}
                                                className="flex-1 py-1.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md text-xs font-medium transition flex items-center justify-center gap-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeletingSurvey(survey)}
                                                className="flex-1 py-1.5 px-3 bg-red-900/20 hover:bg-red-900/40 text-red-500 hover:text-red-400 border border-red-900/30 rounded-md text-xs font-medium transition flex items-center justify-center gap-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <p className="text-sm text-gray-400 order-2 sm:order-1">
                                Showing <span className="text-white font-medium">{surveyData.data.length}</span> of <span className="text-white font-medium">{surveyData.totalCount}</span> results
                            </p>

                            <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-700 bg-gray-900/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors text-sm"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-white bg-gray-800 rounded-lg text-sm">
                                    {currentPage} / {surveyData.totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === surveyData.totalPages || surveyData.totalPages === 0}
                                    className="px-4 py-2 border border-gray-700 bg-gray-900/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors text-sm"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubmissionsPage;
