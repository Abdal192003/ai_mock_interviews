
// // import { generateText } from 'ai';
// // import { google } from "@ai-sdk/google";
// // import { getRandomInterviewCover } from '@/lib/utils';
// // import { db } from '@/firebase/admin';

// // export async function GET() {
// //     return Response.json({
// //         success: true,
// //         data: 'THANK YOU!'
// //     }, {
// //         status: 200
// //     });
// // }

// // export async function POST() {
// //     const { type, role, level, techstack, amount, userid } = await request.json();

// //     try {
// //         const { text : questions } = await generateText({
// //             model: google("gemini-2.0-flash-001"),
// //             prompt: `Prepare questions for a job interview.
// //         The job role is ${role}.
// //         The job experience level is ${level}.
// //         The tech stack used in the job is: ${techstack}.
// //         The focus between behavioural and technical questions should lean towards: ${type}.
// //         The amount of questions required is: ${amount}.
// //         Please return only the questions, without any additional text.
// //         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
// //         Return the questions formatted like this:
// //         ["Question 1", "Question 2", "Question 3"]
        
// //         Thank you! <3
// //     `,
// //         });
        
// //         const interview = {
// //             role,type,level,
// //             techstack:techstack.split(','),
// //             questions:JSON.parse(questions),
// //             userId:userid,
// //             finalized:true,
// //             coverImage:getRandomInterviewCover(),
// //             createdAt:new Date().toISOString()
// //         }
// //         await db.collection("interviews").add(interview);
// //         return Response.json({success:true},{status:200})
// //     } catch (error) {
// //         console.log(error);

// //         return Response.json({ success: false, error }, { status: 500 });
// //     }
// // } 



// // app/api/interview/route.ts

// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";
// import { getRandomInterviewCover } from "@/lib/utils";
// import { db } from "@/firebase/admin";

// export async function GET() {
//   return new Response(
//     JSON.stringify({
//       success: true,
//       data: "THANK YOU!",
//     }),
//     {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// }

// export async function POST(request: Request) {
//   try {
//     const { type, role, level, techstack, amount, userid } =
//       await request.json();

//     const { text: questions } = await generateText({
//       model: google("gemini-2.0-flash-001"),
//       prompt: `Prepare questions for a job interview.
// The job role is ${role}.
// The job experience level is ${level}.
// The tech stack used in the job is: ${techstack}.
// The focus between behavioural and technical questions should lean towards: ${type}.
// The amount of questions required is: ${amount}.
// Please return only the questions, without any additional text.
// The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
// Return the questions formatted like this:
// ["Question 1", "Question 2", "Question 3"]`,
//     });

//     const parsedQuestions = JSON.parse(questions);

//     const interview = {
//       role,
//       type,
//       level,
//       techstack:techstack.split(','),
//       questions: parsedQuestions,
//       userId: userid,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     };

//     await db.collection("interviews").add(interview);

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error generating interview:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: String(error) }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }


import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      data: "THANK YOU!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid } = await request.json();

    if (!type || !role || !level || !techstack || !amount || !userid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]`,
    });

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (e) {
      throw new Error("Failed to parse questions from AI response");
    }

    const interview = {
      role,
      type,
      level,
      techstack: Array.isArray(techstack) ? techstack : techstack.split(','),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString()
    };

    await db.collection("interviews").add(interview);

    return new Response(
      JSON.stringify({
        success: true,
        data: interview
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error generating interview:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}