import { Brand } from "../../types";

interface PreviewProps {
  data: Brand;
}

export function ContactsPreview({ data }: PreviewProps) {
  return (
    <div className="preview-card">
      <h3 className="text-xl font-bold mb-4">Предпросмотр контактов</h3>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Адрес:</p>
          <p>{data.contacts.address}</p>
        </div>
        <div>
          <p className="font-medium">Телефон:</p>
          <p>{data.contacts.phone}</p>
        </div>
        <div>
          <p className="font-medium">Email:</p>
          <p>{data.contacts.email}</p>
        </div>
        <div>
          <p className="font-medium">Режим работы:</p>
          <p>Пн-Пт: {data.contacts.workingHours.weekdays}</p>
          <p>Сб-Вс: {data.contacts.workingHours.weekends}</p>
        </div>
      </div>
    </div>
  );
} 