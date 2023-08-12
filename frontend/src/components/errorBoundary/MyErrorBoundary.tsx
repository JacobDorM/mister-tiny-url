// import React, { ReactNode } from 'react';
export {}
// import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
// import { logger } from '../../services/loggerService';

// type ErrorFallbackProps = {
//   error: Error
//   resetErrorBoundary: () => void
// }

// const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
//   logger.error('Error occurred in the component', { error });
//   return (
//     <div>
//       <h2>Something went wrong.</h2>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// };

// export const MyErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const errorBoundaryProps = useErrorBoundary();

//   return <ErrorBoundary FallbackComponent={ErrorFallback} {...errorBoundaryProps}>{children}</ErrorBoundary>;
// };
