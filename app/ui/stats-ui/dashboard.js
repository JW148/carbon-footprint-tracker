
"use client"


import { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';


const Dashboard = () => {

    const [isClient, setIsClient] = useState(false);

    const embedConfig = {
        type: 'report',
        id: process.env.NEXT_PUBLIC_POWERBI_REPORT_ID,
        embedUrl: process.env.NEXT_PUBLIC_POWERBI_EMBED_URL,
        accessToken: process.env.NEXT_PUBLIC_POWERBI_ACCESS_TOKEN,
        tokenType: models.TokenType.Aad,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false,
            },
          },
          background: models.BackgroundType.Transparent,
        },
      };
    
      // Set up event handlers
      const eventHandlers = new Map([
        ['loaded', function () {
          console.log('Report loaded');
        }],
        ['rendered', function () {
          console.log('Report rendered');
        }],
        ['error', function (event) {
          console.log(event.detail);
        }],
        // Add other event handlers as needed
      ]);

      useEffect(() => {
        setIsClient(true);
    
      }, []);

  return (
    <>
        {isClient && (typeof window !== 'undefined') && (
            <>
                <PowerBIEmbed
                    embedConfig={embedConfig}
                    eventHandlers={eventHandlers}
                    cssClassName="embedContainer embedContainerHeight"
                />
            </>
            )}
    </>
  )
}

export default Dashboard