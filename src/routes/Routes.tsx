import { Route, Routes as RouterRoutes } from 'react-router-dom';
import MainLayout from "components/layouts/MainLayout";
import {Dashboard, DoneTasks} from "pages";

const Routes = () => {
  return(
    <RouterRoutes>
      <Route element={<MainLayout />}>
        <Route path={'*'} element={<Dashboard />} />
        <Route path={'/done'} element={<DoneTasks />} />
      </Route>
    </RouterRoutes>
  )
}

export default Routes