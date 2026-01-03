import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserType } from './types';

type ProfileTabProps = {
  userType: UserType;
};

const ProfileTab = ({ userType }: ProfileTabProps) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Настройки профиля</CardTitle>
            <CardDescription>
              Управляйте информацией вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {userType === 'client' ? 'К' : 'В'}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">Изменить фото</Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Имя</Label>
                <Input placeholder="Ваше имя" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>

              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input type="tel" placeholder="+7 (999) 123-45-67" />
              </div>

              <div className="space-y-2">
                <Label>О себе</Label>
                <Textarea placeholder="Расскажите о себе..." />
              </div>
            </div>

            <Button className="w-full bg-primary">
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
