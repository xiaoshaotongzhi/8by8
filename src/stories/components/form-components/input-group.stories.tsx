import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from '@/components/form-components/input-group';
import {
  FormTemplate,
  Field,
  StringValidators,
  FormFactory,
  useForm,
} from 'fully-formed';
import { GlobalStylesProvider } from '@/stories/global-styles-provider';
import { PageContainer } from '@/components/utils/page-container';

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

class Template extends FormTemplate {
  public readonly name = 'formWithEmailField';
  public readonly fields = [
    new Field({
      name: 'email',
      defaultValue: '',
      validators: [
        StringValidators.email({
          invalidMessage: 'Please enter a valid email address.',
          trimBeforeValidation: true,
        }),
      ],
    }),
  ] as const;
  public readonly autoTrim = true;
}

const Form = FormFactory.createForm(Template);

function FormComponent() {
  const form = useForm(new Form());

  return (
    <form>
      <InputGroup
        field={form.fields.email}
        type="email"
        placeholder="user@example.com"
        labelContent="Email"
        labelVariant="floating"
        containerStyle={{
          maxWidth: '315px',
        }}
      />
    </form>
  );
}

export const Default: Story = {
  render: () => {
    return (
      <GlobalStylesProvider>
        <PageContainer>
          <FormComponent />
        </PageContainer>
      </GlobalStylesProvider>
    );
  },
};
