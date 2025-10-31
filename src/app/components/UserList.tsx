const UserList = ({ users }: { users: string[] }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Spielerliste</h2>
            {users.length === 0 ? (
                <p className="text-gray-500">Keine Spieler vorhanden.</p>
            ) : (
                <ul className="list-disc list-inside space-y-1">
                    {users.map((user, index) => (
                        <div key={index} className="text-gray-700 decoration-0">
                            {user}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default UserList;
