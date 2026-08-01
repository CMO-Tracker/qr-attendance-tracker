// auth.js
// Shared route protection for every admin-facing page. Checks for a valid
// Supabase Auth session and a recognized role in admin_roles; redirects to
// login if either is missing. Sets the global currentAdminRole, then calls
// whatever function name you pass in once the role is confirmed.
let currentAdminRole = null;

async function requireAuth(onReadyCallback) {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "admin-login.html";
    return;
  }

  const { data: roleRow, error } = await supabaseClient
    .from("admin_roles")
    .select("role, office_id")
    .eq("id", session.user.id)
    .single();

  if (error || !roleRow) {
    alert("Your account has no admin role assigned. Contact the coordinator.");
    await supabaseClient.auth.signOut();
    window.location.href = "admin-login.html";
    return;
  }

  currentAdminRole = roleRow.role;
  window.currentAdminRole = currentAdminRole;
  window.currentOfficeId = roleRow.office_id; // null for super_admin
  window.isSuperAdmin = currentAdminRole === "super_admin";
  window.currentSession = session;

  if (typeof onReadyCallback === "function") {
    await onReadyCallback();
  }
}