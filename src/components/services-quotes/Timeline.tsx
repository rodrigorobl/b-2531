
import React from 'react';

interface TimelineItemProps {
  children: React.ReactNode;
  isLast?: boolean;
}

export function TimelineItem({ children, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative pb-8">
      {!isLast && (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      )}
      <div className="relative flex space-x-3">
        <div>
          <div className="relative px-1">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-white">
              <svg
                className="h-5 w-5 text-primary-foreground"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">{children}</ul>
    </div>
  );
}
