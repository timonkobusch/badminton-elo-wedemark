'use server';
export async function checkAdminPassword(password: string): Promise<boolean> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    console.log('Admin Password from env:', adminPassword);
    return password === adminPassword;
}
