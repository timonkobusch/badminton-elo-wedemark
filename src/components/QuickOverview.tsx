const QuickOverview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Players</h3>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-sm text-gray-500 mt-2">Currently registered</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Last Activity</h3>
                <p className="text-xl font-bold text-gray-800">2 hours ago</p>
                <p className="text-sm text-gray-500 mt-2">John vs. Mike</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">All Games</h3>
                <p className="text-3xl font-bold text-primary">328</p>
                <p className="text-sm text-gray-500 mt-2">Total recorded</p>
            </div>
        </div>
    );
};

export default QuickOverview;
