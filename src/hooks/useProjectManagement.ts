
import { useProjectList } from './useProjectList';
import { useProjectDetail } from './projectDetail/useProjectDetail';

export function useProjectManagement() {
  const { projects, isLoading, error, fetchProjects } = useProjectList();
  const { fetchProjectDetails } = useProjectDetail();

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    fetchProjectDetails
  };
}
