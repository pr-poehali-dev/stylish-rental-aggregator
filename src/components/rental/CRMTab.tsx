import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { UserType, Booking } from './types';

type CRMTabProps = {
  userType: UserType;
  bookings: Booking[];
};

const CRMTab = ({ userType, bookings }: CRMTabProps) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-serif font-bold">CRM Панель</h2>
          {userType === 'owner' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить объявление
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Новое объявление</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о вашем объекте
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Название</Label>
                    <Input placeholder="Например: Люксовые апартаменты" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Textarea placeholder="Подробное описание объекта..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Цена за час (₽)</Label>
                      <Input type="number" placeholder="3500" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Локация</Label>
                      <Input placeholder="Москва, ЦАО" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Удобства</Label>
                    <Input placeholder="Wi-Fi, Парковка, Кондиционер" />
                  </div>

                  <div className="space-y-2">
                    <Label>Фотографии</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                      <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Нажмите для загрузки фото</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary" onClick={() => toast.success('Объявление создано!')}>
                  Опубликовать объявление
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Активные объявления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-serif">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Бронирований сегодня
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-serif">8</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Доход за месяц
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-serif">156,000 ₽</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Недавние бронирования</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{booking.propertyTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date.toLocaleDateString('ru')} • {booking.hours} часа
                    </p>
                  </div>
                  <Badge>{booking.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRMTab;
