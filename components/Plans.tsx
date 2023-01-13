import { useState } from 'react';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { netLogoUrl } from '../constants/movie';
import useAuth from '../hooks/useAuth';
import PlanList from './PlanList';
import Table from './Table';
import Loader from './Loader';
import { loadCheckout } from '../lib/stripe';

interface Props {
  products: Product[];
}

function Plans({ products }: Props) {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id!);
    setBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='border-v border-white/10 bg-[#141414]'>
        <Link href='/'>
          <img src={netLogoUrl} alt='Netflix' width={150} height={90} className='cursor-pointer object-contain' />
        </Link>
        <button className='text-lg font-medium hover:underline' onClick={logout}>
          Sign Out
        </button>
      </header>

      <main className='mx-auto pt-28 max-w-5xl px-5 pb-12 transition:all md:px-10'>
        <h1 className='mb-3 text-3xl font-medium'>Choose the plan that's right for you</h1>
        <ul>
          <PlanList text={' Watch all you want. Ad-free.'} />
          <PlanList text={' Recommendations just for you.'} />
          <PlanList text={' Change or cancel your plan anytime.'} />
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-center self-end md:w-3/5'>
            {products.map((prod) => (
              <div
                className={`planBox ${selectedPlan?.id === prod.id ? 'opacity-100' : 'opacity-60'}`}
                key={prod.id}
                onClick={() => setSelectedPlan(prod)}
              >
                {prod.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? <Loader color='dark:fill-gray-300' /> : 'Subscribe'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
