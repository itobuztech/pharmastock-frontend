import React from 'react';
import { useAppSelector } from '../../Lib/Store/hooks';
import './Organizations.scoped.scss';

interface Organization {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}

const organizations: Organization[] = [
  {
    id: 1,
    name: 'OpenAI',
    logo: 'https://via.placeholder.com/50',
    description: 'AI research lab',
    website: 'https://openai.com'
  },
  {
    id: 2,
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/50',
    description: 'Technology solutions provider',
    website: 'https://techcorp.com'
  },
];

export default function OrganizationsPage() {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <section className='min-h-screen bg-gray-100 bg-opacity-50 pt-8'>
      <div className='container max-w-2xl mx-auto shadow-md md:w-3/4'>
        <div className='p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5'>
          <h1 className='text-gray-600 text-center text-2xl'>Organizations</h1>
        </div>
        <div className='space-y-6 bg-white p-4'>
          {organizations.map((org) => (
            <div key={org.id} className='flex items-center p-4 bg-white shadow rounded-lg'>
              <img
                alt={`${org.name} logo`}
                src={org.logo}
                className='object-cover rounded-full h-16 w-16'
              />
              <div className='ml-4'>
                <h2 className='text-gray-800 text-xl font-bold'>{org.name}</h2>
                <p className='text-gray-600'>{org.description}</p>
                <a
                  href={org.website}
                  className='text-indigo-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
