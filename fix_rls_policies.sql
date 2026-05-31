-- ============================================================================
-- RLS POLICIES FOR SECURE MESSAGING SYSTEM
-- ============================================================================
-- IMPORTANT: Replace MON_EMAIL_ADMIN with your actual admin email below
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CLEANUP: Drop existing policies
-- ----------------------------------------------------------------------------
drop policy if exists "authenticated users manage conversations" on public.messaging_conversations;
drop policy if exists "authenticated users manage messages" on public.messaging_messages;

-- ============================================================================
-- TABLE: MESSAGING_CONVERSATIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ADMIN POLICIES (Authenticated Users)
-- ----------------------------------------------------------------------------
-- Admin has full access (SELECT, INSERT, UPDATE, DELETE)
-- Identified by email: MON_EMAIL_ADMIN
-- ----------------------------------------------------------------------------
create policy "admin_full_access_conversations"
on public.messaging_conversations
for all
to authenticated
using (
  exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.email = 'MON_EMAIL_ADMIN'
  )
)
with check (
  exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.email = 'MON_EMAIL_ADMIN'
  )
);

-- ----------------------------------------------------------------------------
-- VISITOR POLICIES (Anonymous Users)
-- ----------------------------------------------------------------------------
-- Visitors can ONLY INSERT (create conversations)
-- NO SELECT, NO UPDATE, NO DELETE allowed
-- ----------------------------------------------------------------------------

-- ALLOW: Visitors can create conversations
create policy "visitors_create_conversations"
on public.messaging_conversations
for insert
to anon
with check (true);

-- DENY: Visitors cannot SELECT conversations
create policy "visitors_no_select_conversations"
on public.messaging_conversations
for select
to anon
using (false);

-- DENY: Visitors cannot UPDATE conversations
create policy "visitors_no_update_conversations"
on public.messaging_conversations
for update
to anon
using (false);

-- DENY: Visitors cannot DELETE conversations
create policy "visitors_no_delete_conversations"
on public.messaging_conversations
for delete
to anon
using (false);

-- ============================================================================
-- TABLE: MESSAGING_MESSAGES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ADMIN POLICIES (Authenticated Users)
-- ----------------------------------------------------------------------------
-- Admin has full access (SELECT, INSERT, UPDATE, DELETE)
-- Identified by email: MON_EMAIL_ADMIN
-- ----------------------------------------------------------------------------
create policy "admin_full_access_messages"
on public.messaging_messages
for all
to authenticated
using (
  exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.email = 'MON_EMAIL_ADMIN'
  )
)
with check (
  exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.email = 'MON_EMAIL_ADMIN'
  )
);

-- ----------------------------------------------------------------------------
-- VISITOR POLICIES (Anonymous Users)
-- ----------------------------------------------------------------------------
-- Visitors can ONLY INSERT messages with sender_role='visitor'
-- NO SELECT, NO UPDATE, NO DELETE allowed
-- ----------------------------------------------------------------------------

-- ALLOW: Visitors can insert messages (as visitor role only)
create policy "visitors_insert_visitor_messages"
on public.messaging_messages
for insert
to anon
with check (sender_role = 'visitor');

-- DENY: Visitors cannot SELECT messages
create policy "visitors_no_select_messages"
on public.messaging_messages
for select
to anon
using (false);

-- DENY: Visitors cannot UPDATE messages
create policy "visitors_no_update_messages"
on public.messaging_messages
for update
to anon
using (false);

-- DENY: Visitors cannot DELETE messages
create policy "visitors_no_delete_messages"
on public.messaging_messages
for delete
to anon
using (false);
