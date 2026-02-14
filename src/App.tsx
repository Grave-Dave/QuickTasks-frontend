import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Snackbar } from "@/components/ui/snackbar";
import Routes from "./routes";
import { store } from "./store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
          <Snackbar />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App
