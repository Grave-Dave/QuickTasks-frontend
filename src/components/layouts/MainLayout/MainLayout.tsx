import { Outlet } from "react-router";
import { Header, Footer } from "components/layouts";
import { DashboardMenu, TaskForm } from "components/containers";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-page-bg">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col w-full">
        <div className="flex min-h-0 flex-1 gap-4">
          <DashboardMenu />
          <div className="min-h-0 min-w-0 flex-1 flex flex-col overflow-auto">
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
