import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Scissors, Flame, Clock } from 'lucide-react';
import { generalServices, bastardServices } from '@/stores/appointmentStore';

// All services combined
const allServices = [...generalServices, ...bastardServices];

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  serviceId: string | null;
  onToggle: (service: any) => void;
  isSelected: (id: string) => boolean;
}

function ServiceDialog({ open, onClose, serviceId, onToggle, isSelected }: ServiceDialogProps) {
  const service = serviceId ? allServices.find(s => s.id === serviceId) : null;
  if (!service) return null;

  const Icon = service.name.toLowerCase().includes('afeitado') || service.name.toLowerCase().includes('trim') || service.name.toLowerCase().includes('beard') ? Flame : Scissors;
  const selected = isSelected(service.id);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg bg-white border border-[#2D5A27]/20 rounded-3xl p-0 overflow-hidden">
        <div className="p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#2D5A27]/10 flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-[#2D5A27]" />
          </div>

          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-2xl text-[#2D5A27] text-left">
              {service.name}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <p className="text-[#333]/70 leading-relaxed text-base">
              {service.description}
            </p>

            <div className="flex items-center gap-4 py-3 border-y border-[#2D5A27]/10">
              <div>
                <span className="text-[#333]/50 text-xs uppercase">Precio</span>
                <p className="text-[#CE1126] font-bold text-2xl">${service.price} MXN</p>
              </div>
              <div className="w-px h-10 bg-[#2D5A27]/10" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2D5A27]" />
                <span className="text-[#333]/70">{service.duration} min</span>
              </div>
            </div>

            {'bastardOnly' in service && service.bastardOnly && (
              <div className="bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xl p-3 text-sm text-[#CE1126] font-medium">
                Servicio exclusivo con Jahzeel Master Barber Bastard Old School
              </div>
            )}

            <Button
              onClick={() => { onToggle(service); onClose(); }}
              className={`w-full rounded-full py-6 font-semibold text-lg ${
                selected
                  ? 'bg-[#CE1126] hover:bg-[#A00D1E] text-white'
                  : 'bg-[#2D5A27] hover:bg-[#1B3A16] text-white'
              }`}
            >
              {selected ? '✓ Agregado al carrito' : '+ Agregar al carrito'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ServiceDialog, allServices };
