"use client";

import SecretAdminPage from "@/app/secret-admin/page";

// Protect /admin with the exact same authentication gate
export default function AdminPage() {
  return <SecretAdminPage />;
}
