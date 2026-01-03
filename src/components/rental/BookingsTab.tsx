import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Booking } from './types';

type BookingsTabProps = {
  bookings: Booking[];
};

const BookingsTab = ({ bookings }: BookingsTabProps) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">Мои бронирования</h2>
        
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold">{booking.propertyTitle}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {booking.date.toLocaleDateString('ru')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {booking.hours} {booking.hours === 1 ? 'час' : 'часа'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      variant={booking.status === 'completed' ? 'secondary' : 'default'}
                      className="mb-2"
                    >
                      {booking.status === 'pending' && 'Ожидает подтверждения'}
                      {booking.status === 'confirmed' && 'Подтверждено'}
                      {booking.status === 'completed' && 'Завершено'}
                    </Badge>
                    <p className="text-2xl font-bold font-serif">{booking.total.toLocaleString()} ₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsTab;
