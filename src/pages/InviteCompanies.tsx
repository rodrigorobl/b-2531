
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { CompanyInvitationManager } from "@/components/tenders/create/CompanyInvitationManager";

export default function InviteCompanies() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Inviter des entreprises</h1>
          <p className="text-muted-foreground mt-1">
            Invitez des entreprises à rejoindre la plateforme BTP CONNECT
          </p>
        </div>
        
        <CompanyInvitationManager standalone={true} />
      </div>
    </Layout>
  );
}
