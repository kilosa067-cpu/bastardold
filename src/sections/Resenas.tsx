import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  service?: string;
}

const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    rating: 5,
    comment: 'La mejor experiencia de barbería que he tenido. Bastard tiene un talento increíble y el ambiente es único.',
    date: '2024-12-15',
    service: 'Corte Clásico',
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Resenas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('bastard-reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    service: '',
  });

  useEffect(() => {
    localStorage.setItem('bastard-reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resenas-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.review-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reviews-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmitReview = () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      service: newReview.service || 'Corte',
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '', service: '' });
    setIsDialogOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      id="resenas"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-moss/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-clay/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="resenas-header text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-clay text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Testimonios
          </span>
          <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Lo que dicen <span className="text-moss">nuestros clientes</span>
          </h2>
          <p className="text-white/70 text-lg">
            Descubre por qué nuestros clientes confían en nosotros para su estilo. 
            Tu opinión también importa.
          </p>
        </div>

        {/* Stats - Preview */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="text-center">
            <div className="font-outfit font-bold text-5xl text-moss mb-2">50+</div>
            <div className="text-white/60">Reseñas</div>
          </div>
          <div className="text-center">
            <div className="font-outfit font-bold text-5xl text-clay mb-2">5.0</div>
            <div className="text-white/60">Calificación promedio</div>
          </div>
          <div className="text-center">
            <div className="font-outfit font-bold text-5xl text-moss mb-2">100%</div>
            <div className="text-white/60">Clientes satisfechos</div>
          </div>
        </div>

        {/* Reviews Grid - Solo preview */}
        <div className="reviews-grid flex justify-center max-w-2xl mx-auto mb-12">
          {reviews.slice(0, 1).map((review) => (
            <article
              key={review.id}
              className="review-card group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-moss/50 transition-all duration-500 hover:bg-white/10"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-moss/30" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-moss to-moss-dark flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-white">{review.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className="text-white/80 mb-4 line-clamp-4">
                "{review.comment}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-white/50">
                <span>{review.service}</span>
                <span>{formatDate(review.date)}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-moss hover:bg-moss-dark text-white rounded-full px-8 py-5"
          >
            <Send className="mr-2 w-5 h-5" />
            Dejar mi reseña
          </Button>
        </div>
      </div>

      {/* Add Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-2xl text-white">
              Comparte tu experiencia
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Tu nombre</label>
              <Input
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-xl"
              />
            </div>

            {/* Service */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Servicio recibido</label>
              <Input
                value={newReview.service}
                onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                placeholder="Ej: Corte Clásico"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-xl"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">Tu reseña</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Cuéntanos tu experiencia..."
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-xl"
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmitReview}
              disabled={!newReview.name.trim() || !newReview.comment.trim()}
              className="w-full bg-moss hover:bg-moss-dark text-white rounded-xl py-5 disabled:opacity-50"
            >
              <Send className="mr-2 w-5 h-5" />
              Publicar reseña
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
