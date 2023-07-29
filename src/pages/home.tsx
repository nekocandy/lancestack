import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default function Home() {
  const session = useSession();
  return <h1>Hello {session.data?.user.name}!</h1>;
}
