import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { applyTheme, getTheme } from './lib/theme';
import { ToastProvider } from './components/Toast';
import { Layout } from './components/Layout';
import { SetupPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage } from './pages/AuthPages';
import { DashboardPage } from './pages/Dashboard';
import { CoursesPage, CourseDetailPage, MyLearningPage, PathsPage } from './pages/Courses';
import { LessonWorkspacePage } from './pages/LessonWorkspace';
import { DsaListPage, DsaProblemPage } from './pages/Dsa';
import { ProjectsPage, ProjectDetailPage } from './pages/Projects';
import { AssessmentPage, AssessmentsListPage } from './pages/Assessment';
import { AchievementsPage, ProgressPage, ProfilePage, SettingsPage } from './pages/LearnPages';
import { AdminDashboardPage, AdminUsersPage, AdminRolesPage, AdminCurriculumPage, AdminSubmissionsPage, AdminAuditPage, AdminSettingsPage, AdminRuntimesPage } from './pages/Admin';
import type { ReactElement } from 'react';

function RequireAuth({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-6">Loading…</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function ThemeInit() {
  // Dark is the default; only a saved 'light' opts out. The same check runs
  // in index.html before first paint to avoid a theme flash.
  useEffect(() => { applyTheme(getTheme()); }, []);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ThemeInit />
        <BrowserRouter>
          <Routes>
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route element={<RequireAuth><Layout /></RequireAuth>}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/courses/:slug/lessons/:lessonId" element={<LessonWorkspacePage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/paths" element={<PathsPage />} />
              <Route path="/practice" element={<DsaListPage />} />
              <Route path="/practice/:slug" element={<DsaProblemPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/assessments" element={<AssessmentsListPage />} />
              <Route path="/assessments/:courseSlug" element={<AssessmentPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/roles" element={<AdminRolesPage />} />
              <Route path="/admin/curriculum" element={<AdminCurriculumPage />} />
              <Route path="/admin/submissions" element={<AdminSubmissionsPage />} />
              <Route path="/admin/audit" element={<AdminAuditPage />} />
              <Route path="/admin/runtimes" element={<AdminRuntimesPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
