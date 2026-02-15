import { ContentGeneratorPage } from "@/components/content-generator-page";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <ContentGeneratorPage />
    </ErrorBoundary>
  );
}