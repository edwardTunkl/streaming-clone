import { Product } from '@stripe/firestore-stripe-payments';
import { goToBillingPortal } from '../lib/stripe';

interface Props {
  products: Product[];
  subscription: any;
}

function Products({ products, subscription }: Props) {
  return (
    <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
      <h4 className='text-lg text-[gray]'>Plan Details</h4>
      {/* Find the current plan */}
      <div className='col-span-2 font-medium'>
        {products.filter((product) => product.id === subscription?.product)[0]?.name}
      </div>
      <p className='cursor-pointer text-blue-500 hover:underline md:text-right' onClick={goToBillingPortal}>
        Change plan
      </p>
    </div>
  );
}

export default Products;
