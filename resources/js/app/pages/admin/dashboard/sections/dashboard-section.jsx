import React, { useEffect, useState } from 'react'
import { ArchiveBoxXMarkIcon, ArrowRightStartOnRectangleIcon, ArrowTopRightOnSquareIcon, BookOpenIcon, BriefcaseIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon, CheckBadgeIcon, CheckCircleIcon, CheckIcon, ClipboardDocumentIcon, ClipboardDocumentListIcon, CursorArrowRaysIcon, CursorArrowRippleIcon, DocumentArrowDownIcon, DocumentChartBarIcon, DocumentCheckIcon, DocumentMagnifyingGlassIcon, DocumentMinusIcon, DocumentPlusIcon, ExclamationCircleIcon, HandThumbDownIcon, PencilSquareIcon, ReceiptRefundIcon, RectangleGroupIcon, UserGroupIcon, UserIcon, UserMinusIcon, XCircleIcon } from '@heroicons/react/24/outline'
import DashboardCardComponents from '../components/dashboard-card-components';
import { administrator_dashboard_service } from '@/app/pages/services/dashboard-service';
import { useSelector } from 'react-redux';

export default function DashboardSection() {
  const { user } = useSelector((state) => state.app);

  const [data, setData] = useState({});
  useEffect(() => {
    async function get_tile(params) {
      const res = await administrator_dashboard_service();
      setData(res);
    }
    get_tile();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  console.log('data', data)
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium font-sans text-gray-800 ml-6">
          <b>{greeting}, {user.employee_fname} {user.employee_lname}</b>
        </h2>
        <div className='border border-black rounded-md shadow-xl p-1.5 px-3.5 mr-3 items-center justify-center'>
          <h2 className="text-lg font-medium text-gray-800 flex items-center">
            <b className="mr-1"><CalendarDaysIcon className='h-6 text-red-600' /></b>
            <b>{currentDate}</b>
          </h2>
        </div>
      </div>
      <div className='flex flex-col gap-9 mt-7'>
        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-1">
            <img src="/images/Outsourcing.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="green"
              name="Pending ERF"
              number={data?.outsourcing?.pending+100 ?? 0}
              icon={<ReceiptRefundIcon />}
            />
            <DashboardCardComponents
              bgColor="green"
              name="On-going ERF"
              number={data?.outsourcing?.ongoing+100 ?? 0}
              icon={<ArrowTopRightOnSquareIcon />}
            />
            <DashboardCardComponents
              bgColor="green"
              name="Active ERF"
              number={data?.outsourcing?.active+100 ?? 0}
              icon={<RectangleGroupIcon />}
            />
            <DashboardCardComponents
              bgColor="green"
              name="Completed ERF"
              number={data?.outsourcing?.active+100 ?? 0}
              icon={<CheckCircleIcon />}
            />
            <DashboardCardComponents
              bgColor="green"
              name="Declined ERF"
              number={data?.outsourcing?.declined+100 ?? 0}
              icon={<ArchiveBoxXMarkIcon />}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-6">
            <img src="/images/Recruitment.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="orange"
              name="Pending Application"
              number={data?.applicant?.app_pending+100 ?? 0}
              icon={<UserGroupIcon />}
            />
            <DashboardCardComponents
              bgColor="orange"
              name="Initial Phase Application"
              number={data?.applicant?.app_initial+100 ?? 0}
              icon={<CursorArrowRaysIcon />}
            />
            <DashboardCardComponents
              bgColor="orange"
              name="Final Phase Application"
              number={data?.applicant?.app_final+100 ?? 0}
              icon={<CursorArrowRippleIcon />}
            />
            <DashboardCardComponents
              bgColor="orange"
              name="Passed Application"
              number={data?.applicant?.app_passed+100 ?? 0}
              icon={<CheckCircleIcon />}
            />
            <DashboardCardComponents
              bgColor="orange"
              name="Failed Application"
              number={data?.applicant?.app_failed+100 ?? 0}
              icon={<XCircleIcon />}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-6">
            <img src="/images/Hiring.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="sky"
              name="Pending Offer"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<DocumentChartBarIcon />}
            />
            <DashboardCardComponents
              bgColor="sky"
              name="Declined Offer"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<DocumentMinusIcon />}
            />
            <DashboardCardComponents
              bgColor="sky"
              name="Accepted Offer"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<DocumentCheckIcon />}
            />
            <DashboardCardComponents
              bgColor="sky"
              name="Pre-Employment Completed"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<CheckCircleIcon />}
            />
            <DashboardCardComponents
              bgColor="sky"
              name="Contract Signing"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<PencilSquareIcon />}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-6">
            <img src="/images/Onboarding.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="violet"
              name="Onboarding Documents"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<ClipboardDocumentListIcon />}
            />
            <DashboardCardComponents
              bgColor="violet"
              name="Onboarded Applicants"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<BriefcaseIcon />}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-6">
            <img src="/images/ER.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="cyan"
              name="Total Employee"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<UserGroupIcon />}
            />
            <DashboardCardComponents
              bgColor="cyan"
              name="Incident Report"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<ExclamationCircleIcon />}
            />
            <DashboardCardComponents
              bgColor="cyan"
              name="NTE"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<ChatBubbleOvalLeftEllipsisIcon />}
            />
            <DashboardCardComponents
              bgColor="cyan"
              name="NDA"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<ChatBubbleLeftRightIcon />}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-800 ml-6">
            <img src="/images/Attrition.webp" alt="Outsourcing.png" className='h-20' />
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 p-4 gap-5">
            <DashboardCardComponents
              bgColor="pink"
              name="Resignation"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<UserMinusIcon />}
            />
            <DashboardCardComponents
              bgColor="pink"
              name="End of Probationary Employment"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<DocumentArrowDownIcon />}
            />
            <DashboardCardComponents
              bgColor="pink"
              name="Dismissal"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<HandThumbDownIcon />}
            />
            <DashboardCardComponents
              bgColor="pink"
              name="AWOL"
              number={parseInt(data?.status??0)+100 ?? 0}
              icon={<ArrowRightStartOnRectangleIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
