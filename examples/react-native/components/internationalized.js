import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import dynamicStyles from './styles';
import { ErrorText } from '../ErrorText/ErrorText';
import { AppHtmlEditor } from '../AppHtmlEditor/AppHtmlEditor';
import { supportedLanguages } from '../../Core/localization/IMLocalization';

function InternationalizedWrapper({ children, field }) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const [currentLanguage, setLanguage] = React.useState(supportedLanguages[0].tag);
  const fieldName = `${field}_${currentLanguage}`;

  function languageButton({ tag, name, isRtl }) {
    const isActive = currentLanguage === tag;
    return (
      <TouchableOpacity
        activeOpacity={.8}
        key={tag}
        onPress={() => setLanguage(tag)}
        style={[styles.languageButtonWrapper, isActive && styles.languageButtonWrapperActive]}>
        <Text style={[styles.languageButtonText, isActive ? styles.languageButtonTextActive : {}]}>{tag}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {children(fieldName)}
      <View style={styles.languageButtonSetWrapper}>
        {supportedLanguages.map(languageButton)}
      </View>
    </>
  );
}

function AppInternationalizedHtmlEditor({ formik, field, source, counter, onBlur, error, ...props }) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  function getHtmlEditor(fieldName) {
    return (
      <>
        <View style={[styles.htmlEditorWrapper, error && styles.htmlEditorWrapperError]}>
          <AppHtmlEditor
            counter={counter}
            value={formik.values[fieldName]}
            fieldName={fieldName}
            onChange={(text) => {
              formik.onValueChange(fieldName)(text);
            }}
            onBlur={onBlur}
            {...props}
          />
        </View>
        {!!error && typeof error === 'string' && <ErrorText>{error}</ErrorText>}
      </>
    );
  }

  return (
    <InternationalizedWrapper field={field}>
      {(fieldName) => (getHtmlEditor(fieldName))}
    </InternationalizedWrapper>
  );
}

export default AppInternationalizedHtmlEditor;
