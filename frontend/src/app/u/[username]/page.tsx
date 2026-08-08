import { Metadata } from "next";
import PublicProfile from "./PublicProfile";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: `${params.username} - BeeCodeFi Profile`,
    description: `View ${params.username}'s coding progress, badges, and recent activity on BeeCodeFi.`,
  };
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  return <PublicProfile username={params.username} />;
}
