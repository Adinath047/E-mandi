import { Navigate } from 'react-router-dom';

export default function MyProducePage() {
  // My Produce is synonymous with My Lots in this application flow
  return <Navigate to="/lots" replace />;
}
