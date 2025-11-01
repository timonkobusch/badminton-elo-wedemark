export const revalidate = 0;
import RankingTable from './components/RankingTable';
import GameInput from './components/GameInput';
import RecentGames from './components/RecentGames';
import { getUsers } from '@/app/actions/users';
import { getGames } from '@/app/actions/games';
import UserList from '@/app/components/UserList';

export default async function Home() {
    const { users, error: usersError } = await getUsers();
    const { games, error: gamesError } = await getGames();
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-start flex-col">
                            <h1 className="text-2xl font-bold text-primary">Badminton Rangliste</h1>
                            <div className="text-gray-600">Wedemark</div>
                        </div>
                    </div>
                </div>
            </header>
            {usersError && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Fehler:</strong>
                        <span className="block sm:inline"> {usersError}</span>
                    </div>
                </div>
            )}
            {gamesError && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Fehler:</strong>
                        <span className="block sm:inline"> {gamesError}</span>
                    </div>
                </div>
            )}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                        <GameInput users={users} />
                    </div>
                    <div className="lg:col-span-2">
                        <RankingTable games={games} />
                    </div>
                    <div>
                        <RecentGames games={games} />
                    </div>
                    <div>
                        <UserList users={users} />
                    </div>
                </div>
            </main>
        </div>
    );
}
