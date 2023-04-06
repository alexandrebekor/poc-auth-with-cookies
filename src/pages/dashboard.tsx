import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { getAPIClient } from "@/lib/fetchWithContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api("/");
  }, []);

  return (
    <main>
      <p>Logged as {user?.name}</p>
    </main>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiServer = getAPIClient(ctx)
  const { ["poc-token"]: token } = parseCookies(ctx);

  await apiServer('/')

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
