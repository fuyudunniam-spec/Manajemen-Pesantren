import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeatureSection } from '@/components/home/FeatureSection';
import { ProgramSection } from '@/components/home/ProgramSection';
import { GallerySection } from '@/components/home/GallerySection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { DonationSection } from '@/components/home/DonationSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
    return (
        <PublicLayout>
            <div className="flex flex-col">
                <HeroSection />
                <StatsSection />
                <FeatureSection />
                <ProgramSection />
                <GallerySection />
                <TestimonialSection />
                <DonationSection />
                <CTASection />
            </div>
        </PublicLayout>
    );
}
