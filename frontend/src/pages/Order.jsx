import React from 'react'
import moment from "moment"
import notFound from "../../public/assest/notFound.png"
import { Link } from 'react-router-dom'
import { useGetLestQuery } from '../redux/features/order/orderApiSlice'

const Order = () => {
  const { data, isLoading, isError, error } = useGetLestQuery()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center' style={{ minHeight: "calc(100vh - 110px)" }}>
        <div className='flex justify-center items-center py-5'>
          <svg className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center' style={{ minHeight: "calc(100vh - 110px)" }}>
        <img src={notFound} alt="" className='w-[300px] mix-blend-multiply' />
        <p className='font-bold text-2xl text-red-600'>{error?.data?.message}</p>
        <Link to={"/"} className='bg-green-600 text-white rounded-full py-1 px-4 mt-4 font-semibold hover:bg-green-700'>Go to home</Link>
      </div>
    )
  }

  if (!isLoading && !isError) {
    return (
      <div className='px-10 py-6'>
        <div className='grid gap-4'>
          {data && data.map((order, i) => (
            <div key={i} className="shadow-md border rounded-md overflow-hidden py-3 px-5">
              <h2 className='text-2xl font-bold mb-1'>Order</h2>
              <p className='text-gray-400 mb-3'>{moment(order.createdAt).calendar()}</p>

              <div className='grid gap-4'>
                {order?.productDetails && order?.productDetails.map((item, i) => (
                  <div key={i} className='flex justify-between items-center bg-gray-100 flex-1 rounded-md overflow-hidden shadow-md'>
                    <div className="w-[140px] h-[140px] bg-slate-200 p-2">
                      <img src={item.images[0]} alt="" className="w-full h-full object-contain mix-blend-darken" />
                    </div>

                    <div className="py-2 px-5 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">{(item.name.length > 40) ? item.name.slice(0, 40) + "..." : item.name}</h3>
                      </div>
                      <div className="flex gap-10 items-center">
                        <div className='flex gap-2'>
                          <p className="text-gray-600 text-xl my-1 font-semibold">${item.price}</p>
                          <p className="text-gray-600 text-xl my-1 font-semibold"> x {item.quantity}</p>
                        </div>
                        <p className="text-red-600 text-xl my-1 font-semibold">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex gap-3 mt-2'>
                <p className='text-gl'>Payment method type: {order.paymentDetails.payment_method_type.join()}</p>
                <p className='text-gl'>Payment status: {order.paymentDetails.payment_status}</p>
              </div>
              <p className='text-right text-gl font-bold'>Shipping Amount: ${order.shipping_options[0].shipping_amount}</p>
              <p className='text-right text-gl font-bold'>Order Total: ${order.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Order