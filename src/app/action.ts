// 'use server';

// import { redirect } from 'next/navigation';

// export async function login(formData: FormData) {

//   const { sessions, users } = require("@clerk/clerk-sdk-node");

//   console.log("Sessions:", sessions);
//   console.log("Users:", users);
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   try {
//     const session = await sessions.create({
//       identifier: data.email,
//       password: data.password,
//     });

//     if (!session) {
//       redirect('/error');
//     }

//     redirect('/profile');
//   } catch (error: any) {
//     console.error('Login error:', error.message);
//     redirect('/error');
//   }
// }

// export async function signup(formData: FormData) {
//   const { sessions, users } = require("@clerk/clerk-sdk-node");

//   console.log("Sessions:", sessions);
//   console.log("Users:", users);
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   try {
//     const user = await users.create({
//       emailAddress: [data.email],
//       password: data.password,
//     });

//     if (!user) {
//       redirect('/error');
//     }

//     redirect('/login');
//   } catch (error: any) {
//     console.error('Signup error:', error.message);
//     redirect('/error');
//   }
// }
