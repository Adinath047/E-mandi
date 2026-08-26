import { Outlet } from 'react-router-dom';

// PublicLayout — for Landing, Login, Register pages
// No app navbar — just the page content
export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}
