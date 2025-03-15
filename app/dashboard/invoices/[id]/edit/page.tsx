import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {
  const { id } = await params
  const [ invoice, customers] = await Promise.all([
    await fetchInvoiceById(id),
    await fetchCustomers()
  ])

  if(!invoice) notFound()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
