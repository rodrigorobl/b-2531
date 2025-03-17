export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appels_offres: {
        Row: {
          budget: number | null
          date_limite: string
          dce_url: string | null
          description: string
          entreprise_attribuee_id: string | null
          id: string
          lot: string
          lots_assigned: number | null
          lots_total: number | null
          nom_projet: string
          progress: number | null
          projet_id: string
          quotes_received: number | null
          statut: Database["public"]["Enums"]["appel_offre_statut"] | null
          type_appel_offre: string
        }
        Insert: {
          budget?: number | null
          date_limite: string
          dce_url?: string | null
          description: string
          entreprise_attribuee_id?: string | null
          id?: string
          lot: string
          lots_assigned?: number | null
          lots_total?: number | null
          nom_projet?: string
          progress?: number | null
          projet_id: string
          quotes_received?: number | null
          statut?: Database["public"]["Enums"]["appel_offre_statut"] | null
          type_appel_offre?: string
        }
        Update: {
          budget?: number | null
          date_limite?: string
          dce_url?: string | null
          description?: string
          entreprise_attribuee_id?: string | null
          id?: string
          lot?: string
          lots_assigned?: number | null
          lots_total?: number | null
          nom_projet?: string
          progress?: number | null
          projet_id?: string
          quotes_received?: number | null
          statut?: Database["public"]["Enums"]["appel_offre_statut"] | null
          type_appel_offre?: string
        }
        Relationships: [
          {
            foreignKeyName: "appels_offres_entreprise_attribuee_id_fkey"
            columns: ["entreprise_attribuee_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appels_offres_projet_id_fkey"
            columns: ["projet_id"]
            isOneToOne: false
            referencedRelation: "project_management_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appels_offres_projet_id_fkey"
            columns: ["projet_id"]
            isOneToOne: false
            referencedRelation: "projets"
            referencedColumns: ["id"]
          },
        ]
      }
      avis: {
        Row: {
          commentaire: string | null
          date_avis: string | null
          entreprise_id: string
          id: string
          note: number
          utilisateur_id: string
        }
        Insert: {
          commentaire?: string | null
          date_avis?: string | null
          entreprise_id: string
          id?: string
          note: number
          utilisateur_id: string
        }
        Update: {
          commentaire?: string | null
          date_avis?: string | null
          entreprise_id?: string
          id?: string
          note?: number
          utilisateur_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avis_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avis_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      devis: {
        Row: {
          appel_offre_id: string
          date_soumission: string | null
          document_url: string | null
          entreprise_id: string
          id: string
          montant: number
          projet_id: string | null
          statut: Database["public"]["Enums"]["devis_statut"] | null
        }
        Insert: {
          appel_offre_id: string
          date_soumission?: string | null
          document_url?: string | null
          entreprise_id: string
          id?: string
          montant: number
          projet_id?: string | null
          statut?: Database["public"]["Enums"]["devis_statut"] | null
        }
        Update: {
          appel_offre_id?: string
          date_soumission?: string | null
          document_url?: string | null
          entreprise_id?: string
          id?: string
          montant?: number
          projet_id?: string | null
          statut?: Database["public"]["Enums"]["devis_statut"] | null
        }
        Relationships: [
          {
            foreignKeyName: "devis_appel_offre_id_fkey"
            columns: ["appel_offre_id"]
            isOneToOne: false
            referencedRelation: "appels_offres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devis_appel_offre_id_fkey"
            columns: ["appel_offre_id"]
            isOneToOne: false
            referencedRelation: "tender_management_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devis_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devis_projet_id_fkey"
            columns: ["projet_id"]
            isOneToOne: false
            referencedRelation: "project_management_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devis_projet_id_fkey"
            columns: ["projet_id"]
            isOneToOne: false
            referencedRelation: "projets"
            referencedColumns: ["id"]
          },
        ]
      }
      entreprises: {
        Row: {
          administrateur_id: string | null
          adresse: string | null
          categorie_principale: Database["public"]["Enums"]["entreprise_categorie"]
          coordinates: Json | null
          date_creation: string | null
          email: string | null
          id: string
          logo: string | null
          nom: string
          nombre_avis: number | null
          note_moyenne: number | null
          pays: string | null
          region: string | null
          site_web: string | null
          specialite: string
          telephone: string | null
          ville: string | null
        }
        Insert: {
          administrateur_id?: string | null
          adresse?: string | null
          categorie_principale: Database["public"]["Enums"]["entreprise_categorie"]
          coordinates?: Json | null
          date_creation?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          nom: string
          nombre_avis?: number | null
          note_moyenne?: number | null
          pays?: string | null
          region?: string | null
          site_web?: string | null
          specialite: string
          telephone?: string | null
          ville?: string | null
        }
        Update: {
          administrateur_id?: string | null
          adresse?: string | null
          categorie_principale?: Database["public"]["Enums"]["entreprise_categorie"]
          coordinates?: Json | null
          date_creation?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          nom?: string
          nombre_avis?: number | null
          note_moyenne?: number | null
          pays?: string | null
          region?: string | null
          site_web?: string | null
          specialite?: string
          telephone?: string | null
          ville?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_administrateur"
            columns: ["administrateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          quotes_received: number | null
          quotes_required: number | null
          status: string | null
          tender_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          quotes_received?: number | null
          quotes_required?: number | null
          status?: string | null
          tender_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          quotes_received?: number | null
          quotes_required?: number | null
          status?: string | null
          tender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lots_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "appels_offres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lots_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tender_management_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      messagerie: {
        Row: {
          date_envoi: string | null
          destinataire_id: string
          expediteur_id: string
          id: string
          lu: boolean | null
          message: string
        }
        Insert: {
          date_envoi?: string | null
          destinataire_id: string
          expediteur_id: string
          id?: string
          lu?: boolean | null
          message: string
        }
        Update: {
          date_envoi?: string | null
          destinataire_id?: string
          expediteur_id?: string
          id?: string
          lu?: boolean | null
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "messagerie_destinataire_id_fkey"
            columns: ["destinataire_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messagerie_expediteur_id_fkey"
            columns: ["expediteur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      projets: {
        Row: {
          budget_estime: number | null
          chiffres_cles: Json | null
          date_debut: string | null
          date_fin: string | null
          description: string
          id: string
          localisation: string | null
          maitre_ouvrage_id: string
          nom: string
          statut: Database["public"]["Enums"]["projet_statut"] | null
          type_projet: string
        }
        Insert: {
          budget_estime?: number | null
          chiffres_cles?: Json | null
          date_debut?: string | null
          date_fin?: string | null
          description: string
          id?: string
          localisation?: string | null
          maitre_ouvrage_id: string
          nom: string
          statut?: Database["public"]["Enums"]["projet_statut"] | null
          type_projet: string
        }
        Update: {
          budget_estime?: number | null
          chiffres_cles?: Json | null
          date_debut?: string | null
          date_fin?: string | null
          description?: string
          id?: string
          localisation?: string | null
          maitre_ouvrage_id?: string
          nom?: string
          statut?: Database["public"]["Enums"]["projet_statut"] | null
          type_projet?: string
        }
        Relationships: [
          {
            foreignKeyName: "projets_maitre_ouvrage_id_fkey"
            columns: ["maitre_ouvrage_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
        ]
      }
      utilisateurs: {
        Row: {
          date_inscription: string | null
          derniere_connexion: string | null
          email: string
          entreprise_id: string | null
          id: string
          mot_de_passe: string
          nom: string
          photo_profil: string | null
          prenom: string
          role: Database["public"]["Enums"]["user_role"]
          telephone: string | null
        }
        Insert: {
          date_inscription?: string | null
          derniere_connexion?: string | null
          email: string
          entreprise_id?: string | null
          id?: string
          mot_de_passe: string
          nom: string
          photo_profil?: string | null
          prenom: string
          role: Database["public"]["Enums"]["user_role"]
          telephone?: string | null
        }
        Update: {
          date_inscription?: string | null
          derniere_connexion?: string | null
          email?: string
          entreprise_id?: string | null
          id?: string
          mot_de_passe?: string
          nom?: string
          photo_profil?: string | null
          prenom?: string
          role?: Database["public"]["Enums"]["user_role"]
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      project_management_summary: {
        Row: {
          budget: number | null
          client_name: string | null
          description: string | null
          end_date: string | null
          id: string | null
          location: string | null
          progress_percentage: number | null
          project_name: string | null
          project_type: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["projet_statut"] | null
          tenders_assigned: number | null
          tenders_count: number | null
        }
        Relationships: []
      }
      tender_management_summary: {
        Row: {
          actual_quotes_received: number | null
          assigned_company_name: string | null
          budget: number | null
          deadline: string | null
          id: string | null
          location: string | null
          lots_assigned: number | null
          lots_total: number | null
          progress_percentage: number | null
          project_name: string | null
          project_type: string | null
          quotes_received: number | null
          status: Database["public"]["Enums"]["appel_offre_statut"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appel_offre_statut: "Ouvert" | "Clôturé" | "Attribué"
      devis_statut: "Soumis" | "Accepté" | "Refusé"
      entreprise_categorie:
        | "Architecte"
        | "MOE_BET"
        | "Construction"
        | "Service"
        | "Industriel"
        | "Fournisseur"
      projet_statut: "En cours" | "Clôturé" | "Attribué"
      user_role:
        | "admin"
        | "entreprise"
        | "MOE_BET"
        | "architecte"
        | "constructeur"
        | "service"
        | "industriel"
        | "fournisseur"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
