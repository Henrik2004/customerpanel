import React from 'react';
import './global.css';
import DashboardSidebar from './ui/dashboardSidebar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <link rel="stylesheet" href="https://cdn.hexle.at/css/fomanticui_293/semantic.min.css" />
            
            <title>Customer-Dashboard</title>
        </head>
        <body>
            <DashboardSidebar />
            <main>{children}</main>
        </body>
        </html>
    )
}