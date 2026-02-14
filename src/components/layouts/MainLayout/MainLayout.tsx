import {Outlet} from "react-router";
import {Header, Footer} from "components/layouts";
import {DashboardMenu} from "components/containers";

const MainLayout = () => {

  const renderHeader = () => {
    return(
        <Header />
    )
  }

  const renderContent = () => {
    return(
      <div>
        <DashboardMenu />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return(
    <div>
      {renderHeader()}
      {renderContent()}
    </div>
  )
}

export default MainLayout
