"use client";
import AuthLayout from '@/components/auth/auth-layout'
import PasswordResetForm from '@/components/forms/PasswordResetForm'
import React from 'react'

const page = () => {
  return (
    <AuthLayout>
        <PasswordResetForm />
    </AuthLayout>
  )
}

export default page