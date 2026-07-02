<?php

use App\Models\ResourceHubItem;

$items = [
    ['name'=>'HRIS','description'=>'Human Resource Information System — employee profiles and records.','url'=>'https://empireone-hris.com/','category'=>'HR & Workforce','color'=>'blue'],
    ['name'=>'ERF — Employee Requisition Form','description'=>'To be used when raising IJP, back-fill, or new role requests.','url'=>'https://empireone-hris.com/admin/sourcing/erf_record','category'=>'HR & Workforce','color'=>'blue'],
    ['name'=>'Kasocius','description'=>'Payroll and timekeeping portal.','url'=>'https://empireone.kasocius.com/','category'=>'HR & Workforce','color'=>'blue'],
    ['name'=>'REACH','description'=>'Coaching Form, Corrective Action, and FGD Engagement.','url'=>'https://script.google.com/a/macros/empireonegroup.com/s/AKfycbzP9HnIyzm-JsCw5VVXQYdOpTMA84BBaLfkQ7s5xDsQrwM1Ef6TQV6KLXjsiwEeNzSR/exec','category'=>'Operations','color'=>'green'],
    ['name'=>'Accounting and Finance Request Form','description'=>'For any processes to be initiated to Accounting and Finance. Contains all previously separate forms.','url'=>'https://forms.gle/6vyCAik5upd97UpZ9','category'=>'Requests and Forms','color'=>'purple'],
    ['name'=>'Written Communications Request Form','description'=>'For requesting emails, letters, announcements, and other written materials. Note: 5-7 business days turnaround.','url'=>'https://forms.clickup.com/90161527978/p/f/2kz0qf5a-2216/1FBE66JCTPQ1PAVZXE/written-communications-request-form','category'=>'Requests and Forms','color'=>'purple'],
    ['name'=>'Creative Services Request Form','description'=>'For requesting email signatures, posters, advertisements, SDE videos, and graphic/multimedia materials. Note: 5-7 business days turnaround.','url'=>'https://forms.clickup.com/90161527978/f/2kz0qf5a-2396/6OVVA65CG00048ZBNZ','category'=>'Requests and Forms','color'=>'purple'],
    ['name'=>'Facilities and Maintenance Request','description'=>'Facilities and maintenance requests outside of the maintenance team daily routine tasks.','url'=>'https://docs.google.com/forms/d/e/1FAIpQLSc8D05b8--pLDFljKf_PokzTVMu0WnByPrshgC3G-gU4jwP_w/viewform','category'=>'Requests and Forms','color'=>'purple'],
    ['name'=>'IT Service Request','description'=>'Submit and track IT-related service requests.','url'=>'https://eo-unified-ims.com/','category'=>'IT and Support','color'=>'red'],
];

foreach ($items as $i) {
    ResourceHubItem::create($i);
}

echo 'Seeded ' . count($items) . " items.\n";
