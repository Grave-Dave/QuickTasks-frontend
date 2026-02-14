import { Outlet } from "react-router";
import { Header, Footer } from "components/layouts";
import { DashboardMenu, TaskForm } from "components/containers";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-page-bg">
      <Header />
      <main className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 gap-4">
          <DashboardMenu />
          <div className="min-w-0 flex-1 flex flex-col">
            <Outlet />
            <Footer />
          </div>
        </div>
      </main>
      <TaskForm />
    </div>
  );
}

export default MainLayout
