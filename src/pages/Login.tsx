
import React from 'react';
import { Layout } from "@/components/Layout";

export default function Login() {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground mt-1">
          Connectez-vous à votre compte BTP CONNECT
        </p>
        {/* Form implementation would go here */}
      </div>
    </Layout>
  );
}
