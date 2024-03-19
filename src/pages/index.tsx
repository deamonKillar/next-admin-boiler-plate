import { NextPage, GetServerSideProps } from "next";
import Dashboard from "@/pages/dashboard";

const DashboardPage: NextPage = () => {
  return <Dashboard />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.url === "/") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false, // Set to true if the redirect is permanent
      },
    };
  }

  return { props: {} };
};

export default DashboardPage;
