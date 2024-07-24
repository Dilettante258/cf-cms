import Image from "next/image";

type Post = {
  id: number;
  title: string;
  content: string;
  cover: string | null;
  authorId: number;
  createTime: Date;
  updateTime: Date;
  author: {
    id: number;
    username: string;
    avatar: string | null;
  };
}[];

async function getData() {
  const res = await fetch("http://127.0.0.1:3000/api/post");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json();
}
export default async function Home() {
  const posts = await getData() as Promise<any>;
  // console.log(1111111111)
  console.log(posts)
  return (
    <main className="">
      <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            The latest and greatest news
          </h2>
          <p className="mb-8 mt-4 text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
            Lorem ipsum dolor sit amet elit ut aliquam
          </p>
          {/* Content */}
          
          <div className="mb-6 grid gap-4 sm:grid-cols-2 sm:justify-items-stretch md:mb-10 md:grid-cols-3 lg:mb-12 lg:gap-6">
          {
            posts.slice(0,3).map((post) => (
              <a
              key={post.id}
              href="#"
              className="flex flex-col gap-4 rounded-md border border-solid border-gray-300 px-4 py-8 md:p-0"
            >
              <img
                src={post.cover??""}
                alt=""
                className="h-60 object-cover"
              />
              <div className="px-6 py-4">
                <p className="mb-4 text-sm font-semibold uppercase text-gray-500">
                  lifestyle
                </p>
                <p className="mb-4 text-xl font-semibold">
                {post.title}
                </p>
                <p className="mb-6 text-sm text-gray-500 sm:text-base lg:mb-8">
                {post.content}
                </p>
                <div className="flex">
                  <img
                    src={post.author?.avatar??""}
                    alt=""
                    className="mr-4 h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h6 className="text-base font-bold">{post.author?.username??""}</h6>
                    <div className="flex flex-col lg:flex-row">
                      <p className="text-sm text-gray-500">Sept 28, 2022</p>
                      <p className="mx-2 hidden text-sm text-gray-500 lg:flex">
                        -
                      </p>
                      <p className="text-sm text-gray-500">6 mins read</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            ))
          }
          </div>
          {/* Button */}
          <a
            href="#"
            className="rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
          >
            View More
          </a>
        </div>
      </div>
    </section>
      <div className="grid grid-cols-3 gap-4 m-16">
      <p>1111</p>
      </div>
    </main>
  );
}
