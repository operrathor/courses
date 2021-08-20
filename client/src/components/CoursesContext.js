import { createContext, useContext, useState } from 'react';

export const CoursesContext = createContext();

export function useCourses() {
  return useContext(CoursesContext);
}

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
}
