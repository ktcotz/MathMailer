import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SUPER_KEY,
  );

  async generateResetLink({ email }: { email: string }) {
    const { data, error } = await this.client.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: 'http://localhost:3000?type=change',
      },
    });

    console.log(data, error);

    if (error) return { message: error.message };

    return { message: 'ok', link: data.properties.action_link };
  }
}
