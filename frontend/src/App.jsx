import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx'
import { RequireAuth, RequireRole } from './components/auth/Protected.jsx'

import { LoginPage } from './pages/auth/LoginPage.jsx'
import { RegisterPage } from './pages/auth/RegisterPage.jsx'
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage.jsx'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage.jsx'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage.jsx'

import { VerifyPublicPage } from './pages/public/VerifyPublicPage.jsx'
import { HomePage } from './pages/public/HomePage.jsx'
import { NotFoundPage } from './pages/system/NotFoundPage.jsx'
import { UnauthorizedPage } from './pages/system/UnauthorizedPage.jsx'
import { ErrorPage } from './pages/system/ErrorPage.jsx'

import { DashboardLayout } from './components/layout/DashboardLayout.jsx'
import { AdminLayout } from './components/layout/AdminLayout.jsx'

import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage.jsx'
import { ProductsListPage } from './pages/dashboard/ProductsListPage.jsx'
import { ProductNewPage } from './pages/dashboard/ProductNewPage.jsx'
import { ProductDetailPage } from './pages/dashboard/ProductDetailPage.jsx'
import { ProductEditPage } from './pages/dashboard/ProductEditPage.jsx'
import { TagsPage } from './pages/dashboard/TagsPage.jsx'
import { TagsGeneratePage } from './pages/dashboard/TagsGeneratePage.jsx'
import { ScanLogsPage } from './pages/dashboard/ScanLogsPage.jsx'
import { FraudAlertsPage } from './pages/dashboard/FraudAlertsPage.jsx'
import { SettingsPage } from './pages/dashboard/SettingsPage.jsx'

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx'
import { AdminManufacturersPage } from './pages/admin/AdminManufacturersPage.jsx'
import { AdminManufacturerDetailPage } from './pages/admin/AdminManufacturerDetailPage.jsx'
import { AdminTagsPage } from './pages/admin/AdminTagsPage.jsx'
import { AdminFraudPage } from './pages/admin/AdminFraudPage.jsx'
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage.jsx'
import { AdminSystemPage } from './pages/admin/AdminSystemPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          <Route path="/verify/:tag_uid" element={<VerifyPublicPage />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="products" element={<ProductsListPage />} />
            <Route path="products/new" element={<ProductNewPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="products/:id/edit" element={<ProductEditPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="tags/generate" element={<TagsGeneratePage />} />
            <Route path="scan-logs" element={<ScanLogsPage />} />
            <Route path="fraud-alerts" element={<FraudAlertsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <RequireRole role="SUPER_ADMIN">
                  <AdminLayout />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="manufacturers" element={<AdminManufacturersPage />} />
            <Route path="manufacturers/:id" element={<AdminManufacturerDetailPage />} />
            <Route path="tags" element={<AdminTagsPage />} />
            <Route path="fraud" element={<AdminFraudPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="system" element={<AdminSystemPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/500" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
