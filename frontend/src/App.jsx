import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;